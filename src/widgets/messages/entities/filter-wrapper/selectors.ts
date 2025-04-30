import { RootState } from '@/app/redux/store'

export const getColorFilter = (state: RootState) => state.filter.color
