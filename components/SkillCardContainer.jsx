import Image from 'next/image';
import styles from '../styles/SkillCardContainer.module.scss';

const SkillCardContainer = (props) => {
  const {skillLogoURL, skillName, skillRate} = props;
  const STAR_WIDTH = '15'
  const STAR_HEIGHT = '15'

  const LOGO_WIDTH = '80';
  const LOGO_HEIGHT = '80';

  // no skillrate, set boundaries 1 - 5
  const scaledSkillRate = (!skillRate) ? 1 : (skillRate < 1) ? 1 : (skillRate > 5) ? 5 : skillRate;

  
  const starLogoURL = "https://img.icons8.com/emoji/48/000000/star-emoji.png";

  return (
    <>
      <div className={styles['skill-card-main']}>
        
        <div className={styles['skill-card-rating']}>
          {
            Array.from({length : scaledSkillRate}, (_, index) => {
              return(
                <Image key={index} src={starLogoURL} width={STAR_WIDTH} height={STAR_HEIGHT} alt="Rating" objectFit="fill">
                </Image>
              )
            })
          }
        </div>
        
        <div className={styles['skill-card-logo']}>
          <Image src={skillLogoURL} alt={skillName} width={LOGO_WIDTH} height={LOGO_HEIGHT} objectFit="fill">
          </Image>
        </div>
        <div className={styles['skill-card-name']}>
          <span>
            {skillName}
          </span>
        </div>
      </div>    
    </>
  );
}
 
export default SkillCardContainer;