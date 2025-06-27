'use client';

import { useEffect, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useGenres } from '@/hooks/api/useGenres';
import { useDebouncedSearch } from '@/hooks/common/useDebounceSearch';
import { usePagination } from '@/hooks/common/usePagination';
import { useDeleteTracks, useTracks } from '@/hooks/api/useTracks';
import { Separator } from '@/components/ui/separator';
import { FilterSelect, SearchInput, SortOrderToggle } from '@/components/app/FilterControls';
import { TracksList } from '@/components/app/TracksList';
import { PaginationControls } from '@/components/app/PaginationControls';
import { SORT_OPTIONS } from '@/lib/constants';
import { toast } from 'sonner';
import { BulkActions } from '@/components/app/actions/BulkActions';
import { useTrackStore } from '@/store/useTrackStore';

export default function MusicPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    page, setPage,
    sort, setSort,
    order, toggleOrder,
    genre, setGenre,
    searchTerm, setSearchTerm,
    selectedIds, selectOne, deselectOne, selectAll, clearSelection,
  } = useTrackStore();

  useEffect(() => {
    const getParam = (key: string, fallback: string) =>
      searchParams.get(key) ?? fallback;

    const initialPage = Number(getParam('page', '1'));
    setPage(initialPage);

    const initialSort = getParam('sort', 'createdAt');
    setSort(initialSort);

    const initialOrder = (getParam('order', 'desc') as 'asc' | 'desc');
    if (initialOrder !== order) {
      useTrackStore.setState({ order: initialOrder });
    }

    const initialGenre = getParam('genre', 'All');
    setGenre(initialGenre);

    const initialSearch = getParam('search', '');
    setSearchTerm(initialSearch);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (page > 1) params.set('page', String(page));
    if (sort !== 'createdAt') params.set('sort', sort);
    if (order !== 'desc') params.set('order', order);
    if (genre !== 'All') params.set('genre', genre);
    if (searchTerm) params.set('search', searchTerm);
    router.replace(`?${params.toString()}`);
  }, [page, sort, order, genre, searchTerm, router]);

  const debouncedSearch = useDebouncedSearch(searchTerm);
  const limit = 8;
  const { data: result, isLoading } = useTracks({
    page,
    limit,
    sort,
    order,
    genre: genre !== 'All' ? genre : undefined,
    search: debouncedSearch || undefined,
  });

  const { data: genres = [] } = useGenres();
  const fallback = { data: [], meta: { totalPages: 1 } };
  const trackList = result ? result : fallback;
  const totalPages = trackList.meta.totalPages;
  const { pages, goTo } = usePagination(totalPages, page, setPage);
  const { mutate: deleteMutation } = useDeleteTracks();

  const allIds = useMemo(() => trackList.data.map(t => t.id), [trackList]);
  const isAllSelected = selectedIds.length > 0 && selectedIds.length === allIds.length;

  const handleSelectAll = (checked: boolean) => {
    if (checked) selectAll(allIds);
    else clearSelection();
  };
  const handleSelectOne = (id: string, checked: boolean) => {
    if (checked) selectOne(id);
    else deselectOne(id);
  };

  const handleSortChange = (val: string) => setSort(val);
  const handleGenreChange = (val: string) => setGenre(val);
  const confirmDelete = () => {
    deleteMutation(selectedIds, {
      onSuccess: () => {
        toast.success("Tracks were successfully deleted");
        clearSelection();
      },
      onError: () => toast.error("Deletion failed"),
    });
  };

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
