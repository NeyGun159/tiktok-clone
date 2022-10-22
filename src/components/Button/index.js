import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({
   to,
   href,
   children,
   onClick,
   primary = false,
   outline = false,
   small = false,
   large = false,
   blackoutline = false,
   text = false,
   disabled = false,
   rounded = false,
   className,
   leftIcon,
   rightIcon,
   ...passProps
}) {
   let Comp = 'button';
   const props = {
      onClick,
      ...passProps,
   };
   if (disabled) {
      Object.keys(props).forEach((key) => {
         if (key.startsWith('on') && typeof props[key] === 'function') {
            delete props[key];
         }
      });
   }
   if (to) {
      props.to = to;
      Comp = Link;
   } else if (href) {
      props.href = href;
      Comp = 'a';
   }

   const classes = cx('wrapper', {
      primary,
      outline,
      small,
      large,
      blackoutline,
      text,
      disabled,
      rounded,
      [className]: className,
   });
   return (
      <Comp className={classes} {...props}>
         {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
         <span className={cx('title')}>{children}</span>
         {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
      </Comp>
   );
}
Button.propTypes = {
   to: PropTypes.string,
   href: PropTypes.string,
   children: PropTypes.node.isRequired,
   onClick: PropTypes.func,
   primary: PropTypes.bool,
   outline: PropTypes.bool,
   small: PropTypes.bool,
   large: PropTypes.bool,
   blackoutline: PropTypes.bool,
   text: PropTypes.bool,
   disabled: PropTypes.bool,
   rounded: PropTypes.bool,
   className: PropTypes.string,
   leftIcon: PropTypes.node,
   rightIcon: PropTypes.node,
};
export default Button;
