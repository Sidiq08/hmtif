<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'db_hmtif' );

/** MySQL database username */
define( 'DB_USER', 'root' );

/** MySQL database password */
define( 'DB_PASSWORD', '' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'S)T VHhbjru?rNVl(wo:tA0{L.8WGcYd$.R;9;<-/=q+W9SC67o%VT0;WdQzkZM8' );
define( 'SECURE_AUTH_KEY',  'cHi1Toybp.ULOA}kt.VV+KNM2h!J,n60*Ou[#E&!KWNH07Wo_B|FTO!-w9=vQ^;,' );
define( 'LOGGED_IN_KEY',    'BbdHr$b#^[ RZwZO-km7Q:@`BormW,~jOM!T=#Kp[)5jF(l!BEQqPOlFe_|lgn-k' );
define( 'NONCE_KEY',        '&@{kS~B:cKF5J;jjPxRx`cQ0l|,djufR)#9Z8`_!KHl;3|cYO4O7{C?,lJN(T)]y' );
define( 'AUTH_SALT',        'v(C;,SU!llH0*QQ2^;~3b*U1F#Se_*V[=gNq Ee&1qDu6</~Cu&,1OhgHBtk0h /' );
define( 'SECURE_AUTH_SALT', 'frOI)8;%VtDSACw5Q]ucZ|W9ppFMiS.jUzwr)W9] nc-KkJE9`X{gd#.G4$)&w{:' );
define( 'LOGGED_IN_SALT',   'yNw%f.z )gRAFZb!_nJFO-#e$c>){{]gdlTz7IG)gO^;p(@Le/q>N;^C,*Q*=MdU' );
define( 'NONCE_SALT',       'um1Q?.^iV`V)c7}#i0J|>?~,|xZ1y0,W?eDNGpjye#!XZz/8(<LYL-ae5Kb1.Gg%' );

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
