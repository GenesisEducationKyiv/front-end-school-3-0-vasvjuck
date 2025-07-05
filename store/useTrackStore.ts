import { create } from 'zustand'

type SortOrder = 'asc' | 'desc';

interface TrackUIState {
    page: number;
    setPage: (p: number) => void;

    sort: string;
    setSort: (s: string) => void;

    order: SortOrder;
    toggleOrder: () => void;

    genre: string;
    setGenre: (g: string) => void;

    searchTerm: string;
    setSearchTerm: (t: string) => void;

    selectedIds: string[];
    selectOne: (id: string) => void;
    deselectOne: (id: string) => void;
    selectAll: (ids: string[]) => void;
    clearSelection: () => void;
}

export const useTrackStore = create<TrackUIState>((set) => ({
    page: 1,
    setPage: p => set({ page: p }),

    sort: 'createdAt',
    setSort: s => set({ sort: s, page: 1 }),

    order: 'desc',
    toggleOrder: () => set(state => ({ order: state.order === 'asc' ? 'desc' : 'asc', page: 1 })),

    genre: 'All',
    setGenre: g => set({ genre: g, page: 1 }),

    searchTerm: '',
    setSearchTerm: t => set({ searchTerm: t, page: 1 }),

    selectedIds: [],
    selectOne: id => set(state => ({
        selectedIds: state.selectedIds.includes(id)
            ? state.selectedIds
            : [...state.selectedIds, id]
    })),
    deselectOne: id => set(state => ({
        selectedIds: state.selectedIds.filter(el => el !== id)
    })),
    selectAll: ids => set({ selectedIds: ids }),
    clearSelection: () => set({ selectedIds: [] }),
}));
