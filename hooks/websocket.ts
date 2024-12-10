import { pusherClient } from "@/lib/pusher"


const useWebsocket = (channelName: string) => {
  const subscribe = () => {
    return pusherClient.subscribe(channelName)
  }

  const unsubscribe = () => {
    return pusherClient.unsubscribe(channelName)
  }

  const bind = <T>(event: string, callBack: (arg: T) => void) => {
    return pusherClient.channel(channelName)?.bind(event, callBack)
  }

  const unbind = <T>(event: string, callBack: (arg: T) => void) => {
    return pusherClient.channel(channelName)?.unbind(event, callBack)
  }

  const trigger = <T>(event: string, data: T) => {
    return pusherClient.channel(channelName).trigger(event, data)
  }

  const channel = () => {
    return pusherClient.channel(channelName)
  }

  return {
    subscribe,
    unsubscribe,
    bind,
    unbind,
    trigger,
    channel,
  }
}

export default useWebsocket
