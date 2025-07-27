import Skeleton from "react-loading-skeleton";
import { useState } from "react";
import styled from "@emotion/styled";
import "react-loading-skeleton/dist/skeleton.css";

export default function SkeletonElement() {
  const [skeletonCount] = useState<number[]>([1, 2, 3]);
  return (
    <div
      data-testid="skeleton-element"
      style={{ margin: "0px auto 0", maxWidth: "768px" }}
    >
      {skeletonCount.map((i) => {
        return (
          <div style={{ display: "flex", alignItems: "center", minHeight: 87, marginBottom: 16, paddingLeft: 20 }} key={`skeleton-${i}`}>
            <ImageWrap>
              <Skeleton height={87} width={60} style={{ marginTop: 0 }} baseColor="#e5e7eb" highlightColor="#f3f4f6" />
            </ImageWrap>
            <TextWrap>
              <Skeleton
                count={2}
                width={180}
                height={20}
                style={{ marginTop: 10, marginBottom: 8 }}
                baseColor="#e5e7eb"
                highlightColor="#f3f4f6"
              />
            </TextWrap>
          </div>
        );
      })}
    </div>
  );
}

const ImageWrap = styled.p`
  display: flex;
  flex-direction: column;
  width: 60px;
  min-width: 60px;
  min-height: 87px;
`;

const TextWrap = styled.p`
  flex: 1;
  margin-top: 5px;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`; 