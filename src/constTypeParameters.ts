
// without const

declare function useStatuses<T>(statuses: T[]): T;

const loadingStatus = useStatuses(['loading', 'idle']);

// with const T

declare function useStatuses2<const T>(statuses: T[]): T;

const loadingStatus2 = useStatuses2(['loading', 'idle']);
