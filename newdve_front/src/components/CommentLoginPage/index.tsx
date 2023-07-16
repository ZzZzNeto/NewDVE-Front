import Image, { StaticImageData, ImageProps } from 'next/image'

interface IComment {
  image: string,
  user: string, 
  content: string, 
  occupation: string
}

export default function Comment({user, content, occupation, image} : IComment){
    return (
      <div className='w-full bg-blue-800 py-5 px-10 rounded-3xl	'>
        <p className='text-sm'>{content}</p>
        <div className='flex items-center mt-5'>
            <Image className='mr-5 rounded-lg object-cover min-h-[51px]' width={65} height={51} alt='userPicture' src={image}/>
            <div className='h-full'>
                <h1 className='text-2xl'>{user}</h1>
                <p className='text-gray-400'>{occupation}</p>
            </div>
        </div>
      </div>
    )
  }
  