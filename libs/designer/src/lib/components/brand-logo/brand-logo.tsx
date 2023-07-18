import { HTMLMotionProps, motion } from 'framer-motion';

export const BrandLogo = (props: HTMLMotionProps<'img'>) => {
  return (
    <motion.img
      src={`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAH5JREFUWEdjZMAB7K3//8clhyx+8Cgj4/9rKkSpZdS6w4huJoYATMGoA0ZDYDQERkNgwEOAmFKQGmpwloT/DQyIK14vXGD8P5GBOLX5DMQXxaMOGA2B0RAYDYEBDwFqFLPEmIGzKH7GQFyrWIqBEacZow4YDYHREBgNgSERAgArh7QhceN8pwAAAABJRU5ErkJggg==`}
      alt="Formalizer Logo"
      {...props}
    />
  );
};
