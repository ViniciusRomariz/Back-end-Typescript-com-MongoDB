

export const CustomMiddleware = (req: any, res: any, next: any) => {

    req.user = {
        password: 'bar',
        username: 'foo test runner local'
    };

    next();
    
}