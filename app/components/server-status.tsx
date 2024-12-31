interface ServerStatusProps {
  status: 'online' | 'offline'
}

export function ServerStatus({ status }: ServerStatusProps) {
  return (
    <div className="flex items-center space-x-2">
      <div className={`w-4 h-4 rounded-full ${status === 'online' ? 'bg-green-500' : 'bg-red-500'}`}></div>
      <span className="text-lg font-bold">Server is {status}</span>
    </div>
  )
}

