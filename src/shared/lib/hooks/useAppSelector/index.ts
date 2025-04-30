import { useSelector } from 'react-redux'

import { RootState } from '@app/redux/store'

export const useAppSelector = useSelector.withTypes<RootState>()
