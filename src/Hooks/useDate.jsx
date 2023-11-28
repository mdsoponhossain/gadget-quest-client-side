

const useDate = (date) => {
    const dateString = date;
    const dateObject = new Date(dateString);
    const milliseconds = dateObject.getTime();
    console.log(milliseconds)
};

export default useDate;