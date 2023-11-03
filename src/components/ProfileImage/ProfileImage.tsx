import * as S from './ProfileImage.styles';
import { ProfileImageProps } from './ProfileImage.types';

export function ProfileImage({ size = 'md', url, name }: ProfileImageProps) {
  const firstLetter = name[0];

  return (
    <S.ProfileImageContainer size={size}>
      {url ? (
        <S.ProfileImage source={{ uri: url }} testID="profile-image" />
      ) : (
        <S.ProfileWithoutImage testID="profile-without-image">
          <S.Text size={size}>{firstLetter}</S.Text>
        </S.ProfileWithoutImage>
      )}
    </S.ProfileImageContainer>
  );
}
