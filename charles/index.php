<?php

	//Archive Redirect
	if (isset($_GET['archives']) && ($_GET['archives'] != '')) {

		//If Date Archives from Contextual Navigation - Get Date Archives
		header("Location: " . $_GET['archives']);
		exit();
		
	} else {

		//If Not Archives - Get Header
		get_header(); 

	}

?>

<!--Site Navigation-->
<?php get_template_part('navigation'); ?>
<!--/Site Navigation-->

	<!--Content-->
	<main>

		<div class="content" id="content">		
	
			<h1 class="hide"><?php _e( 'Blog Entries', 'html5blank' ); ?></h1>
		
			<?php get_template_part('loop'); ?>
			
			<?php get_template_part('pagination'); ?>

		</div>
	
	</main>
	<!--/Content-->

<?php get_footer(); ?>