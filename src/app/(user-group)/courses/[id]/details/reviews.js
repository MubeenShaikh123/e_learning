import React from 'react'
import StarRatings from 'react-star-ratings'

const reviews = ({ course }) => {
    const averageRating = course.reviews.reduce((acc, review) => acc + review.rating, 0) / course.reviews.length;
    return (
        <div>
            <div className='p-2'>
                <div className='mb-2 flex flex-col sm:flex-row gap-x-3 col'>
                    <h2 className='text-2xl font-semibold'>Average Rating: {averageRating.toFixed(1)}</h2>
                    <StarRatings
                        rating={averageRating}
                        starRatedColor="blue"
                        starEmptyColor="gray"
                        numberOfStars={5}
                        starDimension="30px"
                        starSpacing="5px"
                    />
                </div>
            </div>
            {course.reviews.map((review) => (
                <div key={review._id} className='p-2 border-b block'>
                    <div className='flex flex-col sm:flex-row flex-wrap w-full justify-between'>
                        <h1 className='text-2xl'>{review.reviewerName}</h1>
                        <div className='pe-2'>
                            {/* Render 5 stars with filled status based on review.rating */}
                            <StarRatings
                                rating={review.rating}
                                starRatedColor="blue"
                                starEmptyColor="gray"
                                numberOfStars={5}
                                starDimension="20px"
                                starSpacing="2px"
                            />
                        </div>
                    </div>
                    <p className='p-1'>{review.comment}</p>
                </div>
            ))}
            <div className='p-2 border-b list-disc'>...</div>
        </div>
    )
}

export default reviews
