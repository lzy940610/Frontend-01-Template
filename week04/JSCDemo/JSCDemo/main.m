//
//  main.m
//  JSCDemo
//
//  Created by 李振宇 on 2020/5/6.
//  Copyright © 2020 李振宇. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <JavaScriptCore/JavaScriptCore.h>


int main(int argc, const char * argv[]) {
    @autoreleasepool {
        // insert code here...
        // 创建js引擎
        // var context = new JSContext
        // var result
        JSContext* context = [[JSContext alloc] init];
        JSContext* result;
        
        // var taskQueue = [{time: 1000, code: @"", function: f}]
        while (true) {
            
       
            NSString* code = @"new Promise(resolve => resolve()).then(() => this.a = 3), function(){return this.a };";
            
            // var task = taskQuanue.shift()
            
            // await sleep(task.time - Data.now())
            
            // [context evalueteScript:task.code]
            // or [task.f ]
            
            result = [context evaluateScript:code];
            
            NSLog(@"&@", [result toString]);
            
            result = [result callWithArguments:@[]];
            
            NSLog(@"%@", [result toString]);
        }
    }
    return 0;
}
