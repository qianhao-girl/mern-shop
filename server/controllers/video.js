const path = require('path');
const multer = require('multer');
const ffmpeg = require('fluent-ffmpeg');


//===============================
//          Video Upload
//===============================
const PublicVideoMulterCustomStorage = multer.diskStorage(
    {
        destination: function(req, file, cb){
            cb(null, "uploads/videos");
        },
        filename: function(req, file, cb){
            cb(null, `${Date.now()}_${file.originalname}`);
        },
    }
);

const PrivateVideoMulterStorage = multer.diskStorage({
    destination: function(req, file, cb){
        //TODO:
    },
    filename: function(req, file, cb){
        cb(null, `${Date.now()}_${file.originalname}`);
    }
})

const _fileFilter = (req, file, cb) => {
    if(path.extname(file.originalname) != '.mp4'){
        cb(res.status(400).json({success: false, err: "only mp4 file is allowed"}), false);
    }else{
        cb(null, true);
    };
}
const multerUpload = multer({
    storage: PublicVideoMulterCustomStorage,
    fileFilter: _fileFilter,
}).single("video");

exports.postUploadVideo = (req, res) => {
    //TODO: handle the public/private video seperately
    multerUpload(req, res, err => {
        if(err){
            return res.status(400).json({success: false, error: err}) ;
        }else{
            return res.status(200).json({success: true,  video: req.file.path, fileName: req.file.filename });
        }
    })
}

//====================================================
//    Video Thumbnail Generate for Uploaded Video
//====================================================
const getVideoInfo = (videoPath) => {
    return new Promise((resolve, reject) =>{
        return ffmpeg.ffprobe(inputFile, (error, metadata => {
            if(error){ 
                return reject(error)
            };
            const {duration, size} = metadate.format;
            return resolve({
                size,
                durationInSeconds: Math.floor(duration)  
            })

        }))
    })
};

const generateThumbnail = (filePath, cb) => {
    let duration = ffmpeg.ffprobe(filePath, (err, metadata) => {
        if(error){
            cb(error)
        }else{
            return metadata.format.duration; //videoDurationInSeconds: float
        }
    });

    ffmpeg(filePath)
    .on('filenames', function(filenames){
        thumbsFilePath = "upload/thumbnails" + filenames[0]; //the first thumbnail
    })
    .on("end", function(){
        return cb(null, { thumbsFilePath, duration });
    })
    .screenshot({
        //will take screenshots at 20% 40% 60% 80% of the video
        count: 3,
        folder: "uploads/thumbnails"
    });
};

exports.postThumbnailsGenerate = (req, res) => {
    generateThumbnail(req.body.videoPath, (error, info) => {
        if(error) return res.status(400).json({success: false, err: error});
        res.status(200).json({success: true, thumbsFilePath, videoDurationInSeconds});

    })
}
