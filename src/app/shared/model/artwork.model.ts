import { Artist } from './artist.model'
import { Rating } from './rating.model'
import { User } from './user.module';

export class Artwork{
  id : number;
  title :string;
  description : string;
  releaseDate : Date;
  mediaPath : string;
  artist : User;
  ratings : Rating[];
  price : number;
}
