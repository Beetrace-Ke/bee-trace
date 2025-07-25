import React, { useState, useRef } from 'react';
import { DateRangePicker } from 'react-date-range';
import { Input } from "@/components/ui/input"
const DatePickers = ({selectionRange,setSelectionRange}) => {
    const [open, setOpen] = useState(false);
  
    const inputRef = useRef(null);

    const handleSelect = (ranges) => {
        setSelectionRange(ranges.selection);
        console.log(ranges);
        setOpen(false); 
    };

    const togglePicker = () => {
        setOpen((prev) => !prev);
    };

    return (
        <div className="relative">
            <Input 
                type="text" 
                readOnly 
                onClick={togglePicker} 
                value={`${selectionRange.startDate.toLocaleDateString()} - ${selectionRange.endDate.toLocaleDateString()}`} 
                className="border p-2 rounded cursor-pointer w-full md:w-full" // Responsive width
            />
            {open && (
                <div 
                    className="absolute z-50 mt-1" 
                    style={{ left: inputRef.current?.offsetLeft, top: inputRef.current?.offsetTop + inputRef.current?.offsetHeight }} 
                >
                    <DateRangePicker
                        ranges={[selectionRange]}
                        onChange={handleSelect}
                    />
                </div>
            )}
        </div>
    );
};

export default DatePickers;
