import { ChevronUp } from "lucide-react";
import React from "react";

const EditorFooter= ({ handleSubmit }) => {
	return (
		<div className='flex bg-third absolute bottom-0 z-10 w-full'>
			<div className='mx-5 my-[10px] flex justify-between w-full'>
				{/* <div className='mr-2 flex flex-1 flex-nowrap items-center space-x-4'>
					<button className='px-3 py-1.5 font-medium items-center transition-all inline-flex bg-dark-fill-3 text-sm hover:bg-dark-fill-2 text-dark-label-2 rounded-lg pl-3 pr-2'>
						Console
						<div className='ml-1 transform transition flex items-center'>
							<ChevronUp className='fill-gray-6 mx-1 fill-dark-gray-6' />
						</div>
					</button>
				</div> */}
				<div className='ml-auto flex items-center space-x-4'>
					<button
						className='px-6 py-1 text-sm font-medium items-center whitespace-nowrap transition-all focus:outline-none inline-flex bg-green-500 hover:bg-green-600 text-black rounded-lg'
						onClick={handleSubmit}
					>
						Run
					</button>
					<button
						className='px-5 py-1 font-medium items-center transition-all focus:outline-none inline-flex text-sm text-black bg-red-500 hover:bg-red-600 rounded-lg'
						onClick={handleSubmit}
					>
						Submit
					</button>
				</div>
			</div>
		</div>
	);
};
export default EditorFooter;