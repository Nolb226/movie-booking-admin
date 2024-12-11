'use client'
import { cn } from '@/lib/utils'
import { ArrowUpToLine } from 'lucide-react'
import { ChangeEventHandler, useCallback, useState } from 'react'
import { DropzoneOptions, useDropzone } from 'react-dropzone'

interface DropzoneProps extends React.HTMLAttributes<HTMLDivElement> {
    onChange?: ChangeEventHandler<HTMLInputElement>
    options?: DropzoneOptions
    multiple?: boolean
    maxFiles?: number
    defaultImages?: string[]
    preview?: boolean
}

export function Dropzone({
    multiple = false,
    className,
    options,
    onChange,
    preview = true,
    maxFiles = 1,
    defaultImages = [],
}: DropzoneProps) {
    const [files, setFiles] = useState<File[]>([])
    const { getInputProps, getRootProps, isDragActive } = useDropzone({
        multiple,
        maxFiles,
        onDrop: (acceptedFiles) => {
            setFiles(
                acceptedFiles.map((file) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                )
            )
        },
        ...options,
    })

    const renderPreview = useCallback(() => {
        if (!preview) return null
        return Array(maxFiles)
            .fill(null)
            .map((_, index) => {
                const file = files[index]
                if (file) {
                    return (
                        <img
                            //@ts-expect-error preview is assigned in onDrop
                            src={file.preview}
                            className="h-full w-full object-cover"
                            key={`img-${index}`}
                            //@ts-expect-error preview is assigned in onDrop
                            onLoad={() => URL.revokeObjectURL(file.preview)}
                            alt=""
                        />
                    )
                }
                if (defaultImages[index]) {
                    return (
                        <img
                            className="h-full w-full object-cover"
                            src={defaultImages[index]}
                            key={`img-${index}`}
                            alt=""
                        />
                    )
                }
            })
    }, [files, defaultImages, preview, maxFiles])

    return (
        <div {...getRootProps({ className: cn('relative', className) })}>
            <input {...getInputProps({ onChange })} />
            {renderPreview()}
            {isDragActive && (
                <div className="absolute bottom-0 left-0 right-0 top-0 z-[5] flex items-center justify-center bg-black/30">
                    <div className="flex size-16 animate-bounce items-center justify-center rounded-full bg-black/55">
                        <ArrowUpToLine className="text-primary h-12 w-12" />
                    </div>
                </div>
            )}
        </div>
    )
}
