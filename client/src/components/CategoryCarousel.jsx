import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer"
];

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    };

    return (
        <div className="my-20 px-4 md:px-8 lg:px-16 max-w-[1024px] mx-auto dark:bg-gray-800">
            <Carousel className="flex items-center justify-center">
                <CarouselContent className="flex space-x-4 md:space-x-6">
                    {category.map((cat, index) => (
                        <CarouselItem 
                            key={index} 
                            className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
                        >
                            <Button 
                                onClick={() => searchJobHandler(cat)} 
                                variant="outline" 
                                className="w-full py-2 text-sm md:text-base rounded-full text-gray-900 dark:text-white dark:border-gray-700 dark:bg-gray-800"
                            >
                                {cat}
                            </Button>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="ml-2 text-gray-900 dark:text-white"/>
                <CarouselNext className="mr-2 text-gray-900 dark:text-white"/>
            </Carousel>
        </div>
    );
};

export default CategoryCarousel;
