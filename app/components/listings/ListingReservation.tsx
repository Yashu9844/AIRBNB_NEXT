"use client"
import { Range} from 'react-date-range'
import Calender from '../inputs/Calender';
import Button from '../Button';
interface ListingReservationProps{
    price: number;
    totalPrice: number;
      onChangeDate:(value:Range)=>void;
      dateRange:Range
      onSubmit:()=>void;
      disabled?: boolean;
      disableDates:Date[];
      

}

const ListingReservation:React.FC<ListingReservationProps> = (
    {
        price,
        totalPrice,
        onChangeDate,
        dateRange,
        onSubmit,
        disabled,
        disableDates
    }
) => {
  return (
    <div className='bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden' >
      <div className="flex items-center gap-1 p-4">
        <div className="text-2xl font-semibold">
            ${price}
        </div>
        <div className="font-light text-neutral-600">
            night
        </div>
      </div>
      <hr />
      <Calender
      value={dateRange}
      disabledDates={disableDates}
      onChange={(value)=>onChangeDate(value.selection)    }
      />
<hr />
    <div className="p-4">
        <Button
        disabled={disabled}
        label='Reserve'
        onClick={onSubmit}
        />
    </div>
      <div className="p-4 flex items-center justify-between font-semibold text-lg">
        <div className="">Total</div>
        <div className="">${totalPrice}</div>
      </div>
    </div>
  );
};

export default ListingReservation;