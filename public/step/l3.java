package step;

import java.util.Arrays;

public class l3 {
	public static void main(String[] args) {
		int n = 100;
		long[] arr = new long[n];

		for (int i = 1; i <= n; i++) {
			long m = i - 1L;
			long b = 1 + (m * i * (2L * i - 1)) / 6; // b_n = 1 + sum_{k=1}^{n-1} k^2
			int sign = (i % 3 == 0) ? -1 : 1; // pattern: +, +, -, repeating
			arr[i - 1] = b * sign;
		}

		System.out.println(Arrays.toString(arr));

		 long sum = 0L;
		 for (long v : arr) sum += v;

		 System.out.println("Sum: " + sum);
	}
}
