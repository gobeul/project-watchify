import React, { useState, useEffect, HTMLAttributes } from "react";
import styled from "styled-components";

import { essListState, wishListState } from "recoil/userState";
import { useRecoilState } from "recoil";

import { FiCheckCircle } from "react-icons/fi";
import { BsPlusCircle } from "react-icons/bs";

import { content } from "interface/content";
import ContentPoster from "components/common/ContentPoster";

import { myWishList } from "apis/apiMy";

const WishList = () => {
  const [wishList, setWishList] = useRecoilState(wishListState);
  const [essList, setEssList] = useRecoilState(essListState);

  const onClickAddContent = (content: content) => {
    let copy = [...essList];
    copy = [...copy, content];
    setEssList(copy);
  };

  // 찜 목록 불러오기 API 함수
  async function myWishListAPI() {
    let newData = await myWishList();
    setWishList(newData);
  }

  // 찜 목록 불러오기 API
  useEffect(() => {
    myWishListAPI();
  }, []);
  return (
    <div>
      <Layout className="layOut">
        {wishList &&
          wishList.map((content, idx) => {
            const isAlready = essList.some((ess) => ess.pk === content.pk);
            return (
              <SContentsContainer className="SContentsContainer" key={idx}>
                <SBoxContainer className="SBoxContainer">
                  <SContent className="SContent">
                    <ContentPoster
                      content={content}
                      title={content.title}
                      imageUrl={content.imgPath}
                    />
                  </SContent>
                </SBoxContainer>
                <S1DepthContainer className="S1DepthContainer">
                  <S2DepthContainer className="S2DepthContainer">
                    <S3DepthContainer className="S3DepthContainer">
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <STitleDiv className="STitleDiv">{content.title}</STitleDiv>
                        {isAlready ? (
                          <SFiCheckCircle />
                        ) : (
                          <SBsPlusCircle
                            onClick={() => onClickAddContent(content)}
                            className="SBsPlusCircle"
                          />
                        )}
                      </div>
                      {content.finalEpisode > 0 ? <div>{content.finalEpisode}부작</div> : null}
                    </S3DepthContainer>
                  </S2DepthContainer>

                  <SSumDiv className="SSumDiv">{content.summarize}</SSumDiv>
                </S1DepthContainer>
              </SContentsContainer>
            );
          })}
        <PlaceHolder />
      </Layout>
    </div>
  );
};

export default WishList;

const SFiCheckCircle = styled(FiCheckCircle)`
  padding-bottom: 0.2vh;
  width: 6vw;
  height: 6vw;
  color: ${({ theme }) => theme.netflix.pointColor};
`;

const SBsPlusCircle = styled(BsPlusCircle)`
  padding-bottom: 0.2vh;
  width: 6vw;
  height: 6vw;
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 0.3rem;
  margin-top: 1rem;
  overflow: auto;
`;

const SContentsContainer = styled.div`
  display: flex;
  margin: 3vw;
  // width: 90%;
  // margin: auto;
`;

const S1DepthContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0.5rem;
`;
const S2DepthContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const S3DepthContainer = styled.div`
  width: 60vw;
`;

const STitleDiv = styled.div`
  font-size: 1.2rem;
  font-weight: ${({ theme }) => theme.fontSizeType.big.fontWeight};
  width: 80%;
  // white-space: nowrap;
  // overflow: hidden;
  // text-overflow: ellipsis;
`;

const SSumDiv = styled.div`
  font-size: ${({ theme }) => theme.fontSizeType.small.fontSize}
  font-weight: ${({ theme }) => theme.fontSizeType.small.fontWeight};
  margin-top: 1vh;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

interface SContentProps extends HTMLAttributes<HTMLDivElement> {
  imgUrl?: string;
}

const SContent = styled.div`
  background-image: url(${({ imgUrl }: SContentProps) => imgUrl});
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid white;
  border-radius: 10px;
  margin: 0 0.5rem;
  width: 25vw;
  height: 35vw;
`;

const SBoxContainer = styled.div`
  display: flex;
  margin-top: 0.5rem;
`;

const PlaceHolder = styled.div`
  height: 10vh;
`;
