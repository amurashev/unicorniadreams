import TextAndBackground from '../../TextAndBackground'

import styles from './styles.module.scss'

export default function About() {
  return (
    <div className={styles.content}>
      <h1>Welcome to Unicornia!</h1>

      <div className={styles.section}>
        <TextAndBackground
          alt="Unicornia Dreams"
          image="/images/categories/32651447.jpg"
          description={
            <>
              <p>My name is Alena!</p>
              <p>
                All my life I lived in a huge noisy metropolis, but my soul
                always dreamed of the sea. And then my family and I decided to
                move to the small sunny town of Anapa.
              </p>

              <p>
                This city is located on the shores of the Black Sea and it is
                the best place for creativity!
              </p>
            </>
          }
        />
      </div>
      <div className={styles.boxBg}>
        <div className={styles.section}>
          <TextAndBackground
            alt="Unicornia Dreams"
            isRight
            image="/images/about_2.jpg"
            description={
              <>
                <p>
                  Here I started doing my favorite thing: creating plush sea
                  animals and baby mobiles. I create it to give a touch of sea
                  to families living far from the sea, but who love the sea with
                  all heart.
                </p>
                <p>
                  I live near the sea and it inspires me to create each of my
                  toys. I put my love in them, fill them with care and a warm
                  subtropical sun!
                </p>
              </>
            }
          />
        </div>
      </div>

      <div className={styles.section}>
        <TextAndBackground
          alt="Unicornia Dreams"
          image="/images/about_3.jpg"
          description={
            <>
              <p>
                I’m concerned about environmental pollution, so I sew my toys
                from natural fabrics only. Parents can be sure that their child
                is playing with an absolutely safe and environmentally friendly
                toy.
              </p>

              <p>
                I am very glad to create my marine toys for you. They will
                become your true friends!
              </p>

              <p>Love from Russia, Alena!</p>
            </>
          }
        />
      </div>
    </div>
  )
}
