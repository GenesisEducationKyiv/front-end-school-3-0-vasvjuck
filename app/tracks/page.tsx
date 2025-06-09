'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useGenres } from '@/hooks/api/useGenres';
import { useDebouncedSearch } from '@/hooks/common/useDebounceSearch';
import { usePagination } from '@/hooks/common/usePagination';
import { useDeleteTracks } from '@/hooks/api/useTracks';
import { Separator } from '@/components/ui/separator';
import { FilterSelect, SearchInput, SortOrderToggle } from '@/components/app/FilterControls';
import { TracksList } from '@/components/app/TracksList';
import { PaginationControls } from '@/components/app/PaginationControls';
import { SORT_OPTIONS } from '@/lib/constants';
import { toast } from 'sonner';
import { BulkActions } from '@/components/app/actions/BulkActions';
import { O, R } from '@mobily/ts-belt';
import { useTracksV2 } from '@/hooks/api/useTracksV2';
import type { TrackList } from '@/hooks/api/useTracks';

export default function MusicPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const getParam = (key: string, fallback: string): string =>
    O.getWithDefault(O.fromNullable(searchParams.get(key)), fallback);

  const [page, setPage] = useState<number>(Number(getParam('page', '1')));
  const [sort, setSort] = useState<string>(getParam('sort', 'createdAt'));
  const [order, setOrder] = useState<'asc' | 'desc'>(
    getParam('order', 'desc') as 'asc' | 'desc'
  );
  const [genre, setGenre] = useState<string>(getParam('genre', 'All'));
  const [searchTerm, setSearchTerm] = useState<string>(getParam('search', ''));
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const debouncedSearch = useDebouncedSearch(searchTerm);
  const limit = 8;
  const { data: result, isLoading } = useTracksV2({
    page,
    limit,
    sort,
    order,
    genre: genre !== 'All' ? genre : undefined,
    search: debouncedSearch || undefined,
  });


  const { data: genres = [] } = useGenres();
  const fallback = { data: [], meta: { totalPages: 1 } };

  const trackList: TrackList = result
    ? R.getWithDefault(result, fallback)
    : fallback;

  const totalPages = trackList?.meta?.totalPages;
  const { pages, goTo } = usePagination(totalPages, page, setPage);
  const { mutate: deleteMutation } = useDeleteTracks();

  const allIds = useMemo(() => trackList.data.map(t => t.id), [trackList]);
  const isAllSelected = selectedIds.length > 0 && selectedIds.length === allIds.length;

  const handleSelectAll = (checked: boolean) => setSelectedIds(checked ? allIds : []);
  const handleSelectOne = (id: string, checked: boolean) =>
    setSelectedIds((prev) => (checked ? [...prev, id] : prev.filter((el) => el !== id)));

  const handleSortChange = (val: string) => {
    setSort(val);
    setPage(1);
  };

  const handleGenreChange = (val: string) => {
    setGenre(val);
    setPage(1);
  };

  const toggleOrder = () => {
    setOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    setPage(1);
  };

  const confirmDelete = () => {
    deleteMutation(selectedIds, {
      onSuccess: () => {
        toast.success("Tracks were successfully deleted");
        setSelectedIds([]);
      },
      onError: () => toast.error("Deletion failed"),
    });
  };

  useEffect(() => {
    const params = new URLSearchParams();
    if (page > 1) params.set('page', String(page));
    if (sort !== 'createdAt') params.set('sort', sort);
    if (order !== 'desc') params.set('order', order);
    if (genre !== 'All') params.set('genre', genre);
    if (searchTerm) params.set('search', searchTerm);

    router.replace(`?${params.toString()}`);
  }, [page, sort, order, genre, searchTerm, router]);

  return (
    <div className="flex gap-5 flex-col h-[calc(100vh-112px)]">
      <BulkActions
        isAllSelected={isAllSelected}
        selectedCount={selectedIds.length}
        onSelectAll={handleSelectAll}
        onDelete={confirmDelete}
      />
      <div className="flex flex-col md:flex-row items-center gap-4">
        <SearchInput value={searchTerm} onChange={setSearchTerm} />
        <div className="flex items-center gap-4 w-full md:w-auto">
          <FilterSelect
            label="Sort By"
            options={SORT_OPTIONS}
            value={sort}
            onChange={handleSortChange}
            width="140px"
            testId="sort-select"
          />
          <FilterSelect
            label="Genre"
            options={["All", ...genres]}
            value={genre}
            onChange={handleGenreChange}
            testId="filter-genre"
          />
          <SortOrderToggle order={order} onToggle={toggleOrder} />
        </div>
      </div>
      <Separator />
      <div className="flex-grow overflow-y-auto">
        <TracksList
          tracks={trackList.data}
          isLoading={isLoading}
          selectedIds={selectedIds}
          onSelect={handleSelectOne}
        />
      </div>
      <PaginationControls pages={pages} currentPage={page} goTo={goTo} />
    </div>
  );
}
