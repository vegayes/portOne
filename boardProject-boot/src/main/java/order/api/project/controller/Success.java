package order.api.project.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class Success {

	@PostMapping("/goodsPay")
	public String checkSuccess() {
		
		System.out.println("안녕");
		
		System.out.println("결제 성공했어!");
		
		
		
		return "redirect:/";
	}


}
