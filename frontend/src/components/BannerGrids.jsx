import { DollarSign, HelpCircle, Play, Users } from 'lucide-react';
import { Button } from './ui/button';

const BannerGrids= () => {
    return (
        <main className='py-20 border-b border-secondary w-full p-5 flex flex-col justify-center items-center'>
            <div className='mx-auto flex flex-col items-center pb-20'>
                <h1 className='text-[3rem] font-semibold'>For Challengers and Hackers</h1>
            </div>
            <div className="max-w-[1500px]
            mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-16">
                <div className="col-span-1 bg-black/30 p-8 rounded-md sm:col-span-2 lg:col-span-1 space-y-4">
                    <div className='flex items-start border-b border-gray-800 py-2'>
                        <HelpCircle size={50} className='mr-3 text-primary  rounded-full ' />
                        <h2 className="text-2xl font-bold mb-2">
                            Questions</h2>
                    </div>
                    <p className="mb-4">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt molestiae laboriosam nemo veniam libero eligendi!</p>
                    <Button variant='outline' className="py-2 px-4 rounded-md ">Business Opportunities</Button>
                </div>
                <div className="col-span-1 bg-black/30 p-8 rounded-md sm:col-span-2 lg:col-span-1 space-y-4">
                    <div className='flex items-start border-b border-gray-800 py-2'>
                        <Users size={50} className='mr-3 text-primary  rounded-full ' />
                        <h2 className="text-2xl font-bold mb-2">
                            Communities</h2>
                    </div>
                    <p className="mb-4">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt molestiae laboriosam nemo veniam libero eligendi! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum corrupti voluptatibus, sunt rem at quod.</p>
                    <Button variant='outline' className="py-2 px-4 rounded-md ">Business Opportunities</Button>
                </div>
                <div className="col-span-1 bg-black/30 p-8 rounded-md sm:col-span-2 lg:col-span-1 space-y-4">
                    <div className='flex items-start border-b border-gray-800 py-2'>
                        <Play size={50} className='mr-3 text-primary  rounded-full ' />
                        <h2 className="text-2xl font-bold mb-2">
                            Contest</h2>
                    </div>
                    <p className="mb-4">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt molestiae laboriosam nemo veniam libero eligendi! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores minima porro animi atque exercitationem officia neque quia.</p>
                    <Button variant='outline' className="py-2 px-4 rounded-md ">Business Opportunities</Button>
                </div>
                <div className="col-span-1 bg-black/30 p-8 rounded-md sm:col-span-2 lg:col-span-1 space-y-4">
                    <div className='flex items-start border-b border-gray-800 py-2'>
                        <DollarSign size={50} className='mr-3 text-primary  rounded-full ' />
                        <h2 className="text-2xl font-bold mb-2">
                            Rewards</h2>
                    </div>
                    <p className="mb-4">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt molestiae laboriosam nemo Lorem ipsum dolor sit amet.  veniam libero eligendi!</p>
                    <Button variant='outline' className="py-2 px-4 rounded-md ">Business Opportunities</Button>
                </div>
            </div>
        </main>
    )
}

export default BannerGrids