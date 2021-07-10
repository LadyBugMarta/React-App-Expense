import React, { useState, useEffect } from 'react'

export const AddComment = () => {
    const [name, setName] = useState('');
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([])
    const onSubmit = () => {
        setComments(oldArray => [...oldArray, [name, comment]])

        if (Boolean(window.localStorage.comments)) {
            let comments = [...(JSON.parse(localStorage.comments)), [name, comment]]
            localStorage.setItem('comments', JSON.stringify(comments))
        } else {
            let comments = [[name, comment]]
            localStorage.setItem('comments', JSON.stringify(comments))
        }
    }

    useEffect(() => {
        if (Boolean(window.localStorage.comments)) {
          let comments = JSON.parse(window.localStorage.comments)
          setTimeout(() => {
            if (window.localStorage.comments && comments.length > 0) {
                setComments(comments)
            }
          }, 500)
        }
      }, [])

    return (
        <>
            {
                comments.map((item, id) => {
                    return <div className="comment-text" key={id}>
                        <h4>{item[0]}</h4>
                        <p>{item[1]}</p>
                    </div>
                })
            }
            <h3>Add new comment</h3>
            <div className="form-control">
                <label htmlFor="text">Name</label>
                <input 
                onChange={(e) => setName(e.target.value)}
                type="text"
                value={name}
                placeholder="Enter name..."
                />
            </div>
            <div className="form-control">
                <label htmlFor="amount">Comment</label>
                <input
                onChange={(e) => setComment(e.target.value)}
                type="text"
                value={comment}
                placeholder="Enter comment..."
                />
            </div>
            <button onClick={onSubmit} className="btn">Add comment</button>
        </>
    )
}
