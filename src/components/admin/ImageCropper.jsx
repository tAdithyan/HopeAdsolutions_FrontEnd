import { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { X, ZoomIn, ZoomOut, Check } from 'lucide-react';
import { getCroppedImgFile } from '../../utils/cropImage';

const ImageCropper = ({ image, onCropComplete, onCancel, aspect = 2.2 / 1 }) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const onCropChange = (crop) => {
        setCrop(crop);
    };

    const onZoomChange = (zoom) => {
        setZoom(zoom);
    };

    const onCropCompleteInternal = useCallback((_croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleConfirm = async () => {
        try {
            const croppedFile = await getCroppedImgFile(
                image,
                croppedAreaPixels,
                'cropped-offer.jpg'
            );
            onCropComplete(croppedFile, URL.createObjectURL(croppedFile));
        } catch (e) {
            console.error(e);
            alert('Failed to crop image');
        }
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="bg-[#111827] rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col h-[80vh]">
                {/* Header */}
                <div className="p-6 border-b border-gray-800 flex items-center justify-between bg-[#111827] text-white">
                    <div>
                        <h3 className="font-['Oswald'] text-xl font-bold">Crop Offer Image</h3>
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">Adjust to fit home screen billboard (2.2:1 Aspect Ratio)</p>
                    </div>
                    <button
                        onClick={onCancel}
                        className="p-2 hover:bg-gray-800 rounded-full transition-colors text-gray-400 hover:text-white"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Cropper Container */}
                <div className="relative flex-1 bg-black overflow-hidden">
                    <Cropper
                        image={image}
                        crop={crop}
                        zoom={zoom}
                        aspect={aspect}
                        onCropChange={onCropChange}
                        onCropComplete={onCropCompleteInternal}
                        onZoomChange={onZoomChange}
                        classes={{
                            containerClassName: "bg-black",
                            mediaClassName: "max-w-full",
                            cropAreaClassName: "border-2 border-[#FF8A00] shadow-[0_0_0_9999px_rgba(0,0,0,0.6)]"
                        }}
                    />
                </div>

                {/* Controls */}
                <div className="p-6 bg-[#111827] border-t border-gray-800 space-y-6">
                    <div className="flex items-center gap-6">
                        <ZoomOut size={20} className="text-gray-500" />
                        <input
                            type="range"
                            value={zoom}
                            min={1}
                            max={3}
                            step={0.1}
                            aria-labelledby="Zoom"
                            onChange={(e) => onZoomChange(parseFloat(e.target.value))}
                            className="flex-1 accent-[#FF8A00] h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer"
                        />
                        <ZoomIn size={20} className="text-gray-500" />
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={onCancel}
                            className="flex-1 py-4 rounded-xl border border-gray-700 text-gray-400 font-bold hover:bg-gray-800 transition-all font-['Oswald'] uppercase tracking-widest"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleConfirm}
                            className="flex-1 py-4 rounded-xl bg-[#FF8A00] text-white font-bold hover:bg-[#e67c00] transition-all flex items-center justify-center gap-2 font-['Oswald'] uppercase tracking-widest shadow-lg shadow-orange-500/20"
                        >
                            <Check size={20} />
                            Apply Crop
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageCropper;
