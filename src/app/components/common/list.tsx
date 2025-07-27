import React from "react";
import styled from "@emotion/styled";
import { BookResponse } from "@/types/books";
import { InfiniteData } from "@tanstack/react-query";
import Link from "next/link";
import Image from "next/image";

interface ListProps {
  data: InfiniteData<BookResponse, unknown>;
}

export default function List({ data }: ListProps) {
  return (
    <ListWrapper>
      <div className="itemWrapper">
        {data?.pages.map((page: BookResponse) =>
          page.documents.length === 0 ? (
            <div key={"No results"} style={{ textAlign: "center" }}>
              검색 결과가 없습니다
            </div>
          ) : (
            page.documents.map((item, i) => (
              <Link href={item.url} target="_blank" key={item.isbn + i}>
                <div className="item">
                  <div className="itemInner">
                    <div className="image">
                      {item.thumbnail !== "" ? (
                        <Image
                          src={item.thumbnail}
                          width={60}
                          height={87}
                          alt={item.title + `책 이미지`}
                        />
                      ) : (
                        <Image
                          src={
                            "https://t4.ftcdn.net/jpg/02/51/95/53/360_F_251955356_FAQH0U1y1TZw3ZcdPGybwUkH90a3VAhb.jpg"
                          }
                          width={60}
                          height={87}
                          alt={"책 이미지 없음"}
                        />
                      )}
                    </div>
                    <div className="info">
                      <h2>{item.title}</h2>
                      <div className="priceWrap">
                        <span className="price">
                          {item.price
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </span>
                      </div>
                      <div className="person">{item.authors}</div>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )
        )}
      </div>
    </ListWrapper>
  );
}

const ListWrapper = styled.div`
  width: 100%;
  .itemWrapper {
    padding: 10px;
    .item {
      .itemInner {
        width: 100%;
        min-height: 66px;
        display: flex;
        align-items: center;
        padding: 10px;
        border-bottom: 1px solid #e6e6e6;
        box-sizing: border-box;
        @media only screen and (min-width: 1024px) {
          padding: 20px 10px;
        }
        .image {
          flex-shrink: 0;
          position: relative;
          img {
            width: 60px;
            height: 87px;
            object-fit: cover;
            border-radius: 4px;
          }
        }
        .info {
          flex: 1;
          padding-left: 20px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: center;
          h2 {
            margin: 0 0 8px 0;
            font-size: 18px;
            font-weight: 500;
            line-height: 1.3;
            word-break: keep-all;
          }
          .priceWrap {
            .price {
              font-size: 15px;
              color: #222;
            }
          }
          .person {
            margin-top: 6px;
            font-size: 14px;
            color: #555;
          }
        }
      }
    }
  }
`; 