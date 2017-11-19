import {Image as SpotifyImage} from "../../src/spotify/type/common/Image";
import {BaseResponse} from "../BaseResponse";

export class Image implements BaseResponse {
    private image: SpotifyImage;

    private constructor (image: SpotifyImage) {
        this.image = image;
    }

    public expose (): {} {
        return {
            url: this.image.url,
            width: this.image.width,
            height: this.image.height
        };
    }

    public static createFromSpotify (image: SpotifyImage): Image {
        return new Image(image);
    }

    public static chooseSmallestOne (images: SpotifyImage[]): SpotifyImage|null {
        let smallestImage: SpotifyImage|null = null;
        let smallestSize: number = 999999;
        let multiplication: number;

        for (let currentImage of images) {
            multiplication = currentImage.height * currentImage.width;

            if (multiplication < smallestSize) {
                smallestSize = multiplication;
                smallestImage = currentImage;
            }
        }

        return smallestImage;
    }
}