import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { R } from '@mobily/ts-belt';
import { tracksApi, TrackQueryParams } from '@/lib/api/tracks';
import type { TrackList } from './useTracks';
import { isApiError } from '@/lib/utils';


export const fetchTracks = async (
    params: TrackQueryParams = {}
): Promise<R.Result<TrackList, Error>> => {
    try {
        const data = await tracksApi.get(params);
        return R.Ok(data);
    } catch (error: unknown) {
        const apiError = isApiError(error)
            ? error
            : new Error(String(error));
        return R.Error(apiError);
    }
};

export const useTracksV2 = (
    params: TrackQueryParams = {},
    options?: UseQueryOptions<
        R.Result<TrackList, Error>,
        Error
    >
): UseQueryResult<R.Result<TrackList, Error>, Error> => {
    return useQuery({
        queryKey: ['tracks', params],
        queryFn: () => fetchTracks(params),
        ...options,
    });
};
