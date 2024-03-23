import { buttonVariants } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Problem = ({ id, title, fees, description, isOpen, handleOpen }) => {
    const navigate = useNavigate();

    const clickHandler = (e, id) => {
        e.preventDefault();
        navigate(`/problems/${id}`)
    }

    const isEven = id % 2 === 0;
    return (
        <>
            <TableRow
                className={cn('text-white h-16 relative border-none', { 'border-none': isOpen, 'bg-white/10': isEven })}>
                <TableCell className=''>{id}</TableCell>
                <TableCell
                    onClick={(e) => clickHandler(e, id)}
                    className='cursor-pointer hover:text-second'
                >{title}</TableCell>
                <TableCell>{fees}</TableCell>
                <TableCell className=''>
                    <Link className={buttonVariants({
                        variant: 'link',
                    })} to='problem/1'>
                        Participate
                    </Link>
                    <ChevronDown className={cn('h-7 w-7 cursor-pointer hover:text-white float-right transition-all text-muted-foreground', {
                        "-rotate-180": isOpen,
                    })} onClick={handleOpen} />
                </TableCell>
            </TableRow>
            <TableRow className={cn('border-b-0 border-t border-gray-600 w-full bg-secondary text-gray-300', { hidden: !isOpen })}>
                <TableCell className='' colSpan={4}>
                    <span className='text-md text-second'>Problem Description : </span>
                    {description}
                </TableCell>
            </TableRow>
        </>

    );
};

export default Problem;