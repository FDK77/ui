import { ResizableInput } from '@/shared/ui/resizeble-input'
import { ResizableTextarea } from '@/shared/ui/resizeble-textarea'
import { ColorSelect } from '@/shared/ui/selector-color/ui'
import { Switch } from '@/shared/ui/switch'
import { Text } from '@/shared/ui/text'
import { Title } from '@/shared/ui/title'

import { DeleteIcon } from './assets/delete-icon'
import { useSendSettings } from './modal'

export const ModalSettingsFilter = () => {
  const {
    localFilters,
    nameOverLong, // TODO: Сделать модалку
    handleChange,
    handleSubmit,
    handleAddFilter,
    handleDeleteFilter,
    handleClose
  } = useSendSettings()

  return (
    <div
      className='backdrop-blur-0 absolute top-0 left-0 z-100 flex h-full w-full items-center justify-center bg-black/20 transition-all duration-300 hover:backdrop-blur-lg'
      onClick={handleClose}
    >
      <form
        onSubmit={handleSubmit}
        className='z-101 flex w-100 flex-col rounded-md bg-[#212121] p-5'
        onClick={e => e.stopPropagation()}
      >
        <Title title={'Filters'} />

        <div className='mt-5 space-y-2.5'>
          {localFilters.map((filter, index) => (
            <div
              key={index}
              className='relative space-y-1'
            >
              <ResizableInput
                value={filter.name}
                onChange={val => handleChange(index, 'name', val)}
              />
              <ResizableTextarea
                value={filter.value}
                onChange={val => handleChange(index, 'value', val)}
              />
              <div className='flex items-center justify-between'>
                <Text
                  text={'Summary'}
                  opacity
                />
                <Switch
                  enable={filter.summary}
                  setEnable={val => handleChange(index, 'summary', val)}
                />
              </div>

              <ColorSelect
                value={filter.color}
                onChange={val => handleChange(index, 'color', val)}
              />

              <div
                className='absolute top-0 right-0 cursor-pointer'
                onClick={() => handleDeleteFilter(index)}
              >
                <DeleteIcon />
              </div>

              <div className='mt-2.5 h-0.25 w-full bg-white opacity-5'></div>
            </div>
          ))}
        </div>

        <button
          type='button'
          onClick={handleAddFilter}
          className='mt-2.5 w-full rounded-md bg-[#161616] py-2.5 text-base font-bold text-white'
        >
          Добавить фильтр
        </button>
        <button
          type='submit'
          className='mt-2.5 w-full rounded-md bg-[#161616] py-2.5 text-base font-bold text-white'
        >
          Сохранить измeнения
        </button>
      </form>
    </div>
  )
}
