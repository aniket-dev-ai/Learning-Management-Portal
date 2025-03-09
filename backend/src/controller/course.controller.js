

export const  createcourse = async (req, res) => {
    const {coursetitle,category}=req.body;
    if(!coursetitle || !category) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const course = new Course({
        coursetitle,
        category,
        creator: req.user._id,
    });
    await course.save();
    res.status(201).json({
        success: true,
        message: "Course created successfully",
        course,
    });
}