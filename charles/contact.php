<?php
/*
Template Name: Contact Form
*/
?>


<?php 

//Initialization
$nameError = "";
$emailError = "";
$commentError = "";

//If the form is submitted
if(isset($_POST['submitted'])) {

	//Check to see if the honeypot captcha field was filled in
	//if(trim($_POST['checking']) !== '') {
		//$captchaError = true;
	//} else {
	
		//Check to make sure that the name field is not empty
		if(trim($_POST['contactName']) === '') {
			$nameError = 'You forgot to enter your name.';
			$hasError = true;
		} else {
			$name = trim($_POST['contactName']);
		}
		
		//Check to make sure sure that a valid email address is submitted
		if(trim($_POST['email']) === '')  {
			$emailError = 'You forgot to enter your email address.';
			$hasError = true;
		} else if (!eregi("^[A-Z0-9._%-]+@[A-Z0-9._%-]+\.[A-Z]{2,4}$", trim($_POST['email']))) {
			$emailError = 'You entered an invalid email address.';
			$hasError = true;
		} else {
			$email = trim($_POST['email']);
		}
			
		//Check to make sure comments were entered	
		if(trim($_POST['comments']) === '') {
			$commentError = 'You forgot to enter your comments.';
			$hasError = true;
		} else {
			if(function_exists('stripslashes')) {
				$comments = stripslashes(trim($_POST['comments']));
			} else {
				$comments = trim($_POST['comments']);
			}
		}
			
		//If there is no error, send the email
		if(!isset($hasError)) {

			$emailTo = 'ivan@thewilsonproject.com';
			$subject = 'Contact Form Submission from '.$name;
			$body = "Name: $name \n\nEmail: $email \n\nComments: $comments";
			$headers = 'From: My Site <'.$emailTo.'>' . "\r\n" . 'Reply-To: ' . $email;
			
			wp_mail($emailTo, $subject, $body, $headers);

			$emailSent = true;

		}
	//}
}


get_header(); 

?>

	<!--Content-->
	<main>

		<div class="content" id="content">	

<?php if(isset($emailSent) && $emailSent == true) { ?>

	<div class="thanks">
		<h1>Thanks, <?=$name;?></h1>
		<p>Your email was successfully sent. Will be in touch ASAP.</p>
	</div>

<?php } else { ?>

	<?php if (have_posts()) : ?>
	
	<?php while (have_posts()) : the_post(); ?>
		<h1><?php the_title(); ?></h1>
		<?php the_content(); ?>
		
		<?php if(isset($hasError) || isset($captchaError)) { ?>
			<p class="error">There was an error submitting the form.<p>
		<?php } ?>
	
		<form action="<?php the_permalink(); ?>" class="contactForm" id="contactForm" method="post">

			<div class="blkForm">

				<p>All fields are required.</p>
	
				<ol>
					<li>
						<label for="contactName">Name</label>
						<?php if  ($nameError != '') { ?>
							<span class="error"><?=$nameError;?></span> 
						<?php } ?>						
						<input type="text" name="contactName" id="contactName" value="<?php if(isset($_POST['contactName'])) echo $_POST['contactName'];?>" class="requiredField" size="40" />
					</li>
					
					<li>
						<label for="email">Email</label>
						<?php if ($emailError != '') { ?>
							<span class="error"><?=$emailError;?></span>
						<?php } ?>						
						<input type="text" name="email" id="email" value="<?php if(isset($_POST['email']))  echo $_POST['email'];?>" class="requiredField" size="40" />
					</li>
					
					<li>					
						<label for="commentsText">Comments</label>
						<?php if ($commentError != '') { ?>
							<span class="error"><?=$commentError;?></span> 
						<?php } ?>							
						<textarea name="comments" id="commentsText" rows="7" cols="40" class="requiredField"><?php if(isset($_POST['comments'])) { if(function_exists('stripslashes')) { echo stripslashes($_POST['comments']); } else { echo $_POST['comments']; } } ?></textarea>
					</li>				
				</ol>


    			<div class="buttonWell">
    				<input type="hidden" name="submitted" id="submitted" value="true" />
					<input type="submit" name="sendemail" value="SEND EMAIL" />
    			</div>	

			</div>

		</form>
	
		<?php endwhile; ?>
	<?php endif; ?>
<?php } ?>

		</div>
	
	</main>
	<!--Content-->
	
<?php get_sidebar(); ?>

<?php get_footer(); ?>