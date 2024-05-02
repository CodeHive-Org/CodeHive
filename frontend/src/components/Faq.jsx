import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export function Faq() {
    return (
        <div className='w-full border-b bg-black/10 border-secondary py-16 '>
            <h1 className='text-center text-2xl underline pb-8'>FAQ{"'"}s</h1>
            <main className='md:max-w-[900px] p-4 py-6 rounded-md xl:max-w-[1500px] mx-auto'>
                <Accordion type="single" collapsible className=" w-full ">
                    <AccordionItem value=" item-1">
                        <AccordionTrigger className='xl:text-[1.4rem] 
                        text-[1.2rem] hover:text-primary
                        hover:text-[1.3rem] xl:hover:text-[1.5rem]'>Is the Platform Free?</AccordionTrigger>
                        <AccordionContent>
                            Well yes. It is, You just use your own energy for that.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger className='xl:text-[1.4rem] 
                        text-[1.2rem] hover:text-primary
                        hover:text-[1.3rem] xl:hover:text-[1.5rem]'>What is Minimum cost to participate in contest?</AccordionTrigger>
                        <AccordionContent className="pt-2">
                            The only cost is the energy you use. <span className="text-[20px]">😀</span>  well you know that gets renewed every 24 hours.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger className='xl:text-[1.4rem] 
                        text-[1.2rem] hover:text-primary
                        hover:text-[1.3rem] xl:hover:text-[1.5rem]'>How many Members can take part in contest?</AccordionTrigger>
                        <AccordionContent>
                            This is independent of any question, By default you can take part in any contest, unless the creator has a cap for that.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                        <AccordionTrigger className='xl:text-[1.4rem] 
                        text-[1.2rem] hover:text-primary
                        hover:text-[1.3rem] xl:hover:text-[1.5rem]'>Can one take part in multiple contest?</AccordionTrigger>
                        <AccordionContent>
                            Yes, you can take part in multiple contest at the same time.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-5">
                        <AccordionTrigger className='xl:text-[1.4rem] 
                        text-[1.2rem] hover:text-primary
                        hover:text-[1.3rem] xl:hover:text-[1.5rem]'>What is the expected Bandwidth consumption?</AccordionTrigger>
                        <AccordionContent className="pt-2">
                            <span className="text-[20px]">😅</span> That require about 245 bandwidth, and about 200k energy. 
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </main>
        </div>

    )
}
