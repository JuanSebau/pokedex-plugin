<?php
/*
Plugin Name: Pokedex Plugin
Description: Este es un plugin para mostrar una Pokedex.
Version: 1.0
Author: Juan Sebastian Bautista Diaz
Author URI:
*/

// Agregar shortcode
function pokedex_shortcode($atts) {
    // Lee y devuelve el contenido HTML
    ob_start();
    include(plugin_dir_path(__FILE__) . 'index.html');
    return ob_get_clean();
}
add_shortcode('pokedex', 'pokedex_shortcode');

// Cargar estilos y scripts
function load_pokedex_scripts() {
    wp_enqueue_style('pokedex-style', plugins_url('styles/app.css', __FILE__));
    wp_enqueue_script('pokedex-main', plugins_url('src/main.js', __FILE__), array('jquery'), '1.0', true);
}
add_action('wp_enqueue_scripts', 'load_pokedex_scripts');


