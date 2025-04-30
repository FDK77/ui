import { RootState } from '@/app/redux/store'

export const getSelectFilters = (state: RootState) => state.filter.id
