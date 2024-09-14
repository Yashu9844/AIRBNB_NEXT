"use client"

import useSearchModalStore from "@/app/hooks/useSearchModal";
import Modal from "./Modal";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { Range } from "react-date-range";
import dynamic from "next/dynamic";
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect";
import qs from 'query-string'
import { formatISO } from "date-fns";
import Heading from "../Heading";
import Calender from "../inputs/Calender";
import Counter from "../inputs/Counter";
enum STEPS{
    LOCATION = 0,
    DATE = 1,
    INFO =2
}

const SearchModal = () => {
    const searchModal = useSearchModalStore();
    const router = useRouter();
  
    // Step management states
    const [location, setLocation] = useState<CountrySelectValue>();
    const [steps, setSteps] = useState(STEPS.LOCATION);
    const [guestCount, setGuestCount] = useState(1);
    const [roomCount, setRoomCount] = useState(1);
    const [bathroomCount, setBathroomCount] = useState(1);
    const [dateRange, setDateRange] = useState<Range>({
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    });
    const params = useSearchParams();
    const Map = useMemo(
      () => dynamic(() => import("../Map"), { ssr: false }),
      [location]
    );
  
    const onBack = () => {
      setSteps((values) => values - 1);
    };
  
    const onNext = useCallback(() => {
      setSteps((values) => values + 1);
    }, []);
  
    const onSubmit = useCallback(() => {
      // Handle submission logic
      if (steps !== STEPS.INFO) {
        return onNext();
      }
  
      let currentQuery = {};
  
      if (params) {
        currentQuery = qs.parse(params.toString());
      }
  
      const updateQuery: any = {
        ...currentQuery,
        locationValue: location?.value,
        guestCount,
        roomCount,
        bathroomCount,
      };
  
      if (dateRange.startDate) {
        updateQuery.startDate = formatISO(dateRange.startDate);
      }
  
      if (dateRange.endDate) {
        updateQuery.endDate = formatISO(dateRange.endDate);
      }
  
      const url = qs.stringifyUrl(
        {
          url: "/",
          query: updateQuery,
        },
        { skipNull: true }
      );
  
      setSteps(STEPS.LOCATION);
      searchModal.onClose();
      router.push(url);
    }, [
      steps,
      searchModal,
      location,
      guestCount,
      roomCount,
      bathroomCount,
      dateRange,
      router,
      params,
    ]);
  
    const actionLabel = useMemo(() => {
      if (steps === STEPS.INFO) {
        return "Search";
      }
      return "Next";
    }, [steps]);
  
    const secondaryActionLabel = useMemo(() => {
      if (steps === STEPS.LOCATION) {
        return undefined;
      }
      return "Back";
    }, [steps]);
  
    let bodyContent = (
      <div className="flex flex-col gap-8">
        {/* Location and Map Step */}
        <Heading title="Where do you wanna go?" subtitle="Find Perfect Location?" />
        <CountrySelect
          value={location}
          onChange={(value) => setLocation(value as CountrySelectValue)}
        />
        <hr />
        <Map center={location?.latlng} />
      </div>
    );
  
    if (steps === STEPS.DATE) {
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading title="When do you want to stay?" subtitle="Pick a perfect date range!" />
          <Calender value={dateRange} onChange={(value) => setDateRange(value.selection)} />
        </div>
      );
    }
    if (steps === STEPS.INFO) {
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading title="More Information" subtitle="Find a perfect Place" />
         <Counter
         title="Guests"
         subtitle="How many guest are coming?"
         value={guestCount}
onChange={(value: number) => setGuestCount(value)}
         />

          <Counter
            title="Rooms"
            subtitle="How many rooms do you need?"
            value={roomCount}
            onChange={(value: number) => setRoomCount(value)}
          />
          <Counter
            title="Bathrooms"
            subtitle="How many bathrooms you need?"
            value={bathroomCount}
            onChange={(value: number) => setBathroomCount(value)}
          />
        </div>
      );
    }
  
  

    return (
      <div>
        <Modal
          isOpen={searchModal.isOpen}
          onClose={searchModal.onClose}
          title="Filter"
          onSubmit={onSubmit}
          actionLabel={actionLabel}
          body={bodyContent}
          secondaryActionLabel={secondaryActionLabel}
          secondaryAction={steps === STEPS.LOCATION ? undefined : onBack}
        />
      </div>
    );
  };
  
  export default SearchModal;
  