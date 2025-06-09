import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { R } from '@mobily/ts-belt';
import { tracksApi, TrackQueryParams } from '@/lib/api/tracks';
import type { TrackList } from './useTracks';

export const fetchTracks = async (
    params: TrackQueryParams = {}
): Promise<R.Result<TrackList, unknown>> => {
    try {
        const data = await tracksApi.get(params);
        return R.Ok(data);
    } catch (error) {
        return R.Error(error);
    }
};

export const useTracksV2 = (
    params: TrackQueryParams = {},
    options?: UseQueryOptions<Awaited<ReturnType<typeof fetchTracks>>, unknown>
): UseQueryResult<Awaited<ReturnType<typeof fetchTracks>>, unknown> => {
    return useQuery({
        queryKey: ['tracks', params],
        queryFn: () => fetchTracks(params),
        ...options,
    });
};