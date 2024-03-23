import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import ProblemDescription from "./ProblemDescription"
import CodeEditor from "./CodeEditor"
import Result from "./Result"

const WorkSpace = () => {
    return (
        <ResizablePanelGroup
            direction="horizontal"
            className="max-w-full h-[100vh] rounded-lg border-none"
        >
            <ResizablePanel defaultSize={50}>
                <ProblemDescription />
            </ResizablePanel>
            <ResizableHandle withHandle className='bg-gray-600 w-[5px]' />
            <ResizablePanel defaultSize={50}>
                <ResizablePanelGroup direction="vertical">
                    <ResizablePanel defaultSize={50}>
                        <CodeEditor />
                    </ResizablePanel>
                    <ResizableHandle withHandle className='bg-gray-600 w-[5px]' />
                    <ResizablePanel defaultSize={50}>
                        <Result />
                    </ResizablePanel>
                </ResizablePanelGroup>
            </ResizablePanel>
        </ResizablePanelGroup>
    )
}

export default WorkSpace