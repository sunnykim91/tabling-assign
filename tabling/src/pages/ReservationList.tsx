import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import "./ReservationList.scss";
import { RESERVATION } from "../types/reservation";

const RESERVEATION_URL = "http://localhost:5000/reservations";

const ReservationList = () => {
    const [reserveList, setReserveList] = useState<RESERVATION[]>([]);
    const [isVisibleDetail, setIsVisibleDetail] = useState<boolean>(false);
    const [detailInfo, setDetailInfo] = useState<RESERVATION>();
    const [isMobile, setIsMobile] = useState(false);

    const handleResize = () => {
        if (window.innerWidth > 1024) {
            setIsMobile(false);
        } else {
            setIsMobile(true);
        }
    };

    useEffect(() => {
        getData();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [isMobile]);

    const getData = async () => {
        const res = await axios.get(RESERVEATION_URL);
        console.log(res);
        setReserveList(res.data);
    };

    const offSeat = (e: React.MouseEvent<HTMLElement>, data: RESERVATION) => {
        e.stopPropagation();
        const tempResList: RESERVATION[] = reserveList.map(
            (resLi: RESERVATION) => {
                if (resLi.id === data.id) {
                    resLi.status = "done";
                }
                return resLi;
            }
        );
        setReserveList(tempResList);
    };

    const onSeat = (e: React.MouseEvent<HTMLElement>, data: RESERVATION) => {
        e.stopPropagation();
        const tempResList: RESERVATION[] = reserveList.map(
            (resLi: RESERVATION) => {
                if (resLi.id === data.id) {
                    resLi.status = "seated";
                }
                return resLi;
            }
        );
        setReserveList(tempResList);
    };

    const showDetail = (
        e: React.MouseEvent<HTMLElement>,
        data: RESERVATION
    ) => {
        setDetailInfo(data);
        setIsVisibleDetail(true);
    };

    const closeDetailInfo = (e: any) => {
        setIsVisibleDetail(false);
    };

    return (
        <>
            <header>
                <h1>예약 목록</h1>
            </header>
            <main>
                <div className="reserve-lists">
                    {reserveList &&
                        reserveList.map((data: RESERVATION) => {
                            if (data.status !== "done") {
                                return (
                                    <div
                                        key={data.id}
                                        className="reserve-list"
                                        id={data.id}
                                        onClick={(e) => showDetail(e, data)}
                                    >
                                        <p className="time-status">
                                            <p>
                                                {moment(
                                                    data.timeReserved
                                                ).format("HH:mm")}
                                            </p>
                                            <p>
                                                {data.status === "seated"
                                                    ? "착석 중"
                                                    : "예약"}
                                            </p>
                                        </p>
                                        <div className="info-area">
                                            <p className="name-area">
                                                {data.customer.name} -
                                                {data.tables.map(
                                                    (table) => table.name
                                                )}
                                            </p>
                                            <p className="person-area">
                                                성인 {data.customer.adult} 아이{" "}
                                                {data.customer.child}
                                            </p>
                                            <p className="menu-area">
                                                {data.menus.map(
                                                    (menu) =>
                                                        `${menu.name}(${menu.qty}) `
                                                )}
                                            </p>
                                        </div>
                                        <div className="btn-area">
                                            {data.status === "seated" ? (
                                                <button
                                                    onClick={(e) =>
                                                        offSeat(e, data)
                                                    }
                                                >
                                                    퇴석
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={(e) =>
                                                        onSeat(e, data)
                                                    }
                                                >
                                                    착석
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                );
                            }
                        })}
                </div>
                {isVisibleDetail ? (
                    <div className="modal-background">
                        <section className="detail-info ">
                            <div className="reserve-info">
                                <p className="title">예약 정보</p>
                                {isMobile ? (
                                    <button
                                        className="closeBtn"
                                        onClick={closeDetailInfo}
                                    >
                                        닫기
                                    </button>
                                ) : (
                                    <></>
                                )}

                                <div className="content-list">
                                    <p className="head">예약 상태</p>
                                    <p className="status">
                                        {detailInfo?.status === "seated"
                                            ? "착석중"
                                            : "예약"}
                                    </p>
                                </div>
                                <div className="content-list">
                                    <p className="head">예약 시간</p>
                                    <p className="reserve-time">
                                        {moment(
                                            detailInfo?.timeReserved
                                        ).format("HH:mm")}
                                    </p>
                                </div>
                                <div className="content-list">
                                    <p className="head">접수 시간</p>
                                    <p className="register-time">
                                        {moment(
                                            detailInfo?.timeRegistered
                                        ).format("HH:mm")}
                                    </p>
                                </div>
                            </div>
                            <div className="customer-info">
                                <p className="title">고객 정보</p>
                                <div className="content-list">
                                    <p className="head">고객 성명</p>
                                    <p className="customer-name">
                                        {detailInfo?.customer.name}
                                    </p>
                                </div>
                                <div className="content-list">
                                    <p className="head">고객 등급</p>
                                    <p>{detailInfo?.customer.level}</p>
                                </div>
                                <div className="content-list">
                                    <p className="head">고객 메모</p>
                                    <p className="customer-memo">
                                        {detailInfo?.customer.memo}
                                    </p>
                                </div>
                                <div className="content-list">
                                    <p className="head ">요청 사항</p>
                                    <p className="customer-request">
                                        {detailInfo?.customer.request}
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>
                ) : (
                    <></>
                )}
            </main>
        </>
    );
};

export default ReservationList;
