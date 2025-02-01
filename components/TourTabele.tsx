'use client';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { fetchTours } from '@/store/tourSlice';

interface TourType {
    _id: string;
    tour_number: string;
    checkIn_date: string;
    checkOut_date: string;
    tour_duration: string;
    tour_availability: boolean;
    tour_space: number;
    createdAt: string;
    updatedAt: string;
    tour_id: string;
}

export default function TourTabele() {

    const dispatch = useDispatch<AppDispatch>();
    const tours = useSelector((state: RootState) => state.tours.tours);
    const status = useSelector((state: RootState) => state.tours.status);


    //  const [tours, setTours] = useState<TourType[]>([]);
    const [showAll, setShowAll] = useState<boolean>(false);
    const t = useTranslations();


    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchTours());
        }
    }, [dispatch, status]);

    return (<div className="mt-12 bg-white rounded-lg shadow-lg p-1 sm:p-1">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 text-center">
            🔥 {t("apply_r")}
        </h2>
        {status === "loading" ? (
            <p className="text-center text-gray-500">Ture se učitavaju...</p>
        ) : (
            <table className="w-full border-collapse text-xs sm:text-sm">
                <thead>
                    <tr className="bg-gray-800 text-white">
                        <th className="p-2 sm:p-3 text-[10px] sm:text-[12px] md:text-[16px] text-center">
                            {t("a_tabele1")}
                        </th>
                        <th className="p-2 sm:p-3 text-[10px] sm:text-[12px] md:text-[16px] text-center">
                            {t("a_tabele2")}
                        </th>
                        <th className="p-2sm:p-3 text-[10px] sm:text-[12px] md:text-[16px] text-center">
                            {t("a_tabele3")}
                        </th>
                        <th className="p-2 sm:p-3 text-[10px] sm:text-[12px] md:text-[16px] text-center">
                            {t("a_tabele4")}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {tours.slice(0, showAll ? tours.length : 8).map((tour) => (
                        <tr key={tour._id} className="border-b">
                            <td className="p-2 sm:p-3 text-[10px] sm:text-[12px] md:text-[16px]">
                                {tour.tour_number}
                            </td>
                            <td className="p-2 sm:p-3 text-[10px] sm:text-[12px] md:text-[16px]">
                                {tour.checkIn_date}
                            </td>
                            <td className="p-2 sm:p-3  text-[10px] sm:text-[12px] md:text-[16px]">
                                {tour.checkOut_date}
                            </td>
                            <td className="p-2 text-center text-[10px] sm:text-[12px]  md:text-[16px]">
                                <span
                                    className={`px-1 py-1 uppercase   text-white sm:p-3 text-[10px] sm:text-[12px] md:text-[16px] ${tour.tour_space === 0 ? "bg-red-500" : "bg-green-500"
                                        }`}
                                >
                                    {tour.tour_space === 0 ? "Nicht Verfügbar" : "Verfügbar"}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}

        {/* Dugme za prikaz više */}
        <div className="text-center mt-4">
            <button
                onClick={() => setShowAll(!showAll)}
                className="bg-red-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg text-sm sm:text-lg font-semibold hover:bg-red-700 transition transform hover:scale-105"
            >
                {!showAll ? <>📉{t("gastebuch_b2")}</> : <>📈{t("gastebuch_b3")}</>}

            </button>
        </div>
    </div>)

}