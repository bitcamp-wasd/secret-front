import React from "react";
import Layout from "../../components/Layout";
import VideoBox from "../../components/VideoBox";

const BattleList = () => {
    const dummyVideos = Array.from({ length: 12 }, (_, index) => ({
        id: index + 1,
        title: `Video ${index + 1
            } 이렇게 제목이 길면 너가 뭘 할 수 있는지 궁금한데`,
        thumbnail: `https://via.placeholder.com/276x155.25?text=Thumbnail+${index + 1
            }`,
        author: "홍길동",
    }));

    return (
        <Layout showFooter={false}>
            <div className="main-container-690 mt80">

                <div className="videos-grid">
                    {dummyVideos.map((video) => (
                        <VideoBox
                            key={video.id}
                            thumbnail={video.thumbnail}
                            title={video.title}
                            author={video.author}
                        />
                    ))}
                </div>
            </div>
        </Layout >
    )
}

export default BattleList;