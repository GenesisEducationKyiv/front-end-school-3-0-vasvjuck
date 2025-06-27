import { useQuery } from '@tanstack/react-query';
import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { R } from '@mobily/ts-belt';
import { tracksApi } from '@/lib/api/tracks';
import type { TrackQueryParams } from '@/lib/api/tracks';
import type { TrackList } from './useTracks';
import { isApiError } from '@/lib/utils';

export const fetchTracks = async (
    params: TrackQueryParams = {}
): Promise<R.Result<TrackList, Error>> => {
    try {
        const data = await tracksApi.get(params);
        return R.Ok(data);
    } catch (error: unknown) {
        let err: Error;
        if (error instanceof Error) {
            err = error;
        } else if (isApiError(error)) {
            err = new Error(error.message);
        } else {
            err = new Error(String(error));
        }
        return R.Error(err);
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
