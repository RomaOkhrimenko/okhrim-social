import React, {FC, useState} from 'react';

interface IInputUpload {
    name: string,
    setImage: (arg0: any) => void,
    className?: string
    value?: string
    isShowPreview: boolean,
    hidden?: boolean,
    ref?: any
}

const InputUpload: FC<IInputUpload> = React.forwardRef<any, IInputUpload>(({name, className, setImage, isShowPreview, hidden = false}, ref) => {
    const [fileInputState, setFileInputState] = useState('');
    const [previewSource, setPreviewSource] = useState('');
    const [selectedFile, setSelectedFile] = useState();

    const uploadImage = (base64EncodedImage: string | ArrayBuffer | null) => {
        setImage(base64EncodedImage)
    }

    const handleFileInputChange = (e: any) => {
        const file = e.target.files[0];
        previewFile(file);
        setSelectedFile(file);
        setFileInputState(e.target.value);
    };

    const previewFile = (file: File) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            // @ts-ignore
            setPreviewSource(reader.result);
            uploadImage(reader.result)
        };
    };

    const handleSubmitFile = (e: any) => {
        e.preventDefault();
        if (!selectedFile) return;
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
    };

    return (
        <>
            <input ref={ref} hidden={hidden} type={'file'} name={name} className={className ? className : ''} onChange={handleFileInputChange} value={fileInputState} />

            {isShowPreview && previewSource && (
                <img src={previewSource} alt="chosen" style={{height: '150px', width: '150px', borderRadius: '50%', objectFit: 'cover'}}/>
            )}
        </>
    );
});

export default InputUpload;