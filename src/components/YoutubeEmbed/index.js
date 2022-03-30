import React from 'react'

export default function YoutubeEmbed(props) {
    const {url, height} = props

    const initiateYoutubeVideo = (inputUrl) => {
        var regExp =
            /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
        var match = inputUrl.match(regExp)
        var id = match && match[7].length === 11 ? match[7] : false
        return `https://www.youtube.com/embed/${id}`
    }
    
    return (
        <>
            <div className="video-responsive">
                <iframe
                    width="100%"
                    style={{
                        borderRadius:'10px'}
                    }
                    height={height || "360"}
                    src={`https://www.youtube.com/embed/${id}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Embedded youtube"
                />
            </div>
        </>
    )
}