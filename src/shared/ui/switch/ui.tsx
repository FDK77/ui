interface SwitchProps {
  enable: boolean
  setEnable: (enable: boolean) => void
}

export const Switch = ({ enable, setEnable }: SwitchProps) => {
  return (
    <div
      onClick={() => setEnable(!enable)}
      className={`flex h-6 w-12 cursor-pointer items-center rounded-full p-1 transition-colors duration-300 ${enable ? 'bg-[#766ac8]' : 'bg-[#161616]'}`}
    >
      <div
        className={`h-4 w-4 transform rounded-full bg-[#D9D9D9] shadow-md transition-transform duration-300 ${enable ? 'translate-x-6' : 'translate-x-0'}`}
      />
    </div>
  )
}
